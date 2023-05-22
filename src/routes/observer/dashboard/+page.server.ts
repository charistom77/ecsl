import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	console.log('user', session.user.user_metadata.district_id)

	const { data: results, error } = await supabase
		.from('report')
		.select(`*, profiles(full_name), political_parties(*), districts(*)`)
		.eq('district_id', session.user.user_metadata.district_id);

		console.log(error);

	return { session, results };
}) satisfies PageServerLoad;
