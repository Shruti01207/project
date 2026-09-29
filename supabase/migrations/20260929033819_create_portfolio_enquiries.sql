/*
# Create portfolio enquiries table

1. New Tables
- `portfolio_enquiries`
- `id` (uuid, primary key) uniquely identifies each enquiry.
- `name` (text) stores the visitor's name.
- `email` (text) stores the visitor's reply address.
- `project_type` (text) stores the selected kind of work.
- `budget` (text) stores the optional budget range.
- `message` (text) stores the project enquiry.
- `created_at` (timestamptz) records when the enquiry was received.

2. Security
- Enable row-level security on `portfolio_enquiries`.
- Deny direct browser access for all roles; the server route writes enquiries using the protected service role.
- Add separate deny-by-default policies for select, insert, update, and delete.

3. Important Notes
- No sign-in is required for the public portfolio.
- Enquiries are intentionally private and are not readable from the public page.
- The server validates input length and required fields before inserting a row.
*/

CREATE TABLE IF NOT EXISTS public.portfolio_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  budget text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "portfolio_enquiries_select_denied" ON public.portfolio_enquiries;
CREATE POLICY "portfolio_enquiries_select_denied"
  ON public.portfolio_enquiries FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "portfolio_enquiries_insert_denied" ON public.portfolio_enquiries;
CREATE POLICY "portfolio_enquiries_insert_denied"
  ON public.portfolio_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "portfolio_enquiries_update_denied" ON public.portfolio_enquiries;
CREATE POLICY "portfolio_enquiries_update_denied"
  ON public.portfolio_enquiries FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "portfolio_enquiries_delete_denied" ON public.portfolio_enquiries;
CREATE POLICY "portfolio_enquiries_delete_denied"
  ON public.portfolio_enquiries FOR DELETE
  TO anon, authenticated
  USING (false);

REVOKE ALL ON public.portfolio_enquiries FROM anon, authenticated;
GRANT INSERT ON public.portfolio_enquiries TO service_role;
