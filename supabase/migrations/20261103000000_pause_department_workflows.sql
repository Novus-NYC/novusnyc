-- Department operations pause. Public intake, project status/URL updates,
-- public showcase settings, and account authentication remain independent.
create or replace function public.department_workflows_paused()
returns boolean language sql stable as $$ select true $$;

create or replace function public.guard_department_workflows()
returns trigger language plpgsql security definer set search_path = pg_catalog, public as $$
declare
  r jsonb;
  affected boolean := false;
begin
  if public.department_workflows_paused() then
    if tg_table_name = 'businesses' then
      affected := (tg_op = 'UPDATE' and
        (new.assignees is distinct from old.assignees or new.tech_priority is distinct from old.tech_priority))
        or (tg_op = 'INSERT' and cardinality(new.assignees) > 0);
    elsif tg_table_name = 'automation_deliveries' then
      -- Suppress the claim itself so the sender skips the recipient without
      -- recording a failed delivery. Finance-only members keep their notices.
      if new.automation_id = 'project_draft_ready' or
         (new.automation_id in ('infraction_issued','service_hours_summary') and exists (
            select 1 from public.team t where lower(t.email) = lower(new.recipient)
            and t.divisions && array['Marketing','Tech']::text[]
         )) then return null; end if;
    else
      -- Inspect both sides: moving a record out of a paused pod is also a write.
      for r in select v from (values
        (case when tg_op <> 'INSERT' then to_jsonb(old) end),
        (case when tg_op <> 'DELETE' then to_jsonb(new) end)
      ) as rows(v) where v is not null loop
        if tg_table_name = 'team' then
          affected := (r->'divisions') ?| array['Tech','Marketing'] and
            (tg_op <> 'UPDATE' or (to_jsonb(old) - array['auth_uid','updated_at']) is distinct from
                                   (to_jsonb(new) - array['auth_uid','updated_at']));
        elsif tg_table_name = 'member_strikes' then
          affected := exists (select 1 from public.team t where t.id = r->>'member_id'
            and t.divisions && array['Marketing','Tech']::text[]);
        elsif tg_table_name = 'pod_attendance' then
          affected := exists (select 1 from public.pod_meetings m join public.pods p on p.id = m.pod_id
            where m.id = r->>'meeting_id' and p.track = 'Marketing');
        else
          affected := r->>'track' in ('Marketing','Tech') or exists (
            select 1 from public.pods p where p.id = r->>'pod_id' and p.track = 'Marketing'
          ) or (tg_table_name = 'assignments' and r->>'business_id' is not null and coalesce(r->>'track','') <> 'Finance');
        end if;
        exit when affected;
      end loop;
    end if;
    if affected then raise exception using errcode = 'P0001', message = 'Tech and Marketing workflows are temporarily paused. Project statuses remain available.'; end if;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
do $$
declare tbl text;
begin
  foreach tbl in array array['businesses','team','pods','pod_members','pod_meetings','pod_attendance',
    'pod_content_items','pod_outreach_records','grant_opportunities','assignments','member_strikes','automation_deliveries'] loop
    execute format('drop trigger if exists department_pause on public.%I',tbl);
    execute format('create trigger department_pause before %s on public.%I for each row execute function public.guard_department_workflows()',
      case tbl when 'businesses' then 'insert or update of assignees, tech_priority'
               when 'automation_deliveries' then 'insert' else 'insert or update or delete' end,tbl);
  end loop;
end;
$$;

update public.automation_configs set enabled = false where automation_id = 'project_draft_ready';
update public.email_templates set active = false where key in (
  'acceptance_tech','acceptance_interview_tech','acceptance_outreach','acceptance_interview_outreach',
  'acceptance_social','acceptance_interview_social','acceptance_grants','acceptance_interview_grants',
  'acceptance_ambassadors','acceptance_interview_ambassadors');
