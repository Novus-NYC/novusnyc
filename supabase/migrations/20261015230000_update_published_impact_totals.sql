-- Publish the requested all-time totals and the exact Partners page count,
-- including RDRC in Queens and the Staten Island SBDC in Staten Island.
-- Preserve unrelated public-number overrides and live automatic counts.
UPDATE public.site_settings
   SET public_stat_overrides = coalesce(public_stat_overrides, '{}'::jsonb) ||
       jsonb_build_object(
         'homeStudentMembers', '550',
         'homeBusinessesSupported', '270',
         'aboutBusinesses', '270',
         'communityOrganizations', '27'
       )
 WHERE id = 'singleton';
