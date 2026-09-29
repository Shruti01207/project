import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Please check your details and try again.' }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const name = typeof input.name === 'string' ? input.name.trim() : '';
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const projectType = typeof input.projectType === 'string' ? input.projectType.trim() : '';
    const budget = typeof input.budget === 'string' ? input.budget.trim() : '';
    const message = typeof input.message === 'string' ? input.message.trim() : '';

    if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || projectType.length < 2 || projectType.length > 100 || message.length < 20 || message.length > 4000 || budget.length > 100) {
      return NextResponse.json({ message: 'Please complete the form with valid details.' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ message: 'The enquiry form is temporarily unavailable.' }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { error } = await supabase.from('portfolio_enquiries').insert({
      name,
      email,
      project_type: projectType,
      budget: budget || null,
      message,
    });

    if (error) {
      console.error('portfolio enquiry insert failed', error);
      return NextResponse.json({ message: 'We could not save your enquiry. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Thanks — your enquiry is on its way.' }, { status: 201 });
  } catch (error) {
    console.error('portfolio enquiry request failed', error);
    return NextResponse.json({ message: 'We could not send your enquiry. Please try again.' }, { status: 500 });
  }
}
