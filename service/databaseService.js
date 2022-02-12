import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkyNDAzMCwiZXhwIjoxOTU5NTAwMDMwfQ.CUjQzOJjsy5PP7lVOWiaqPh_vgn0xJa3Es05kMBUIbc';
const SUPABASE_URL = 'https://beuwynkzcrmlmodzmtdb.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class DatabaseService {
  insertNewPerson(person) {
    supabaseClient
      .from('person')
      .insert([person])
      .then(({ data }) => {
        console.log('inserted data', data);
      });
  }

  updatePerson(id, person) {
    return supabaseClient.from('person').update(person).match({ id: id });
  }

  selectPersonList() {
    return supabaseClient.from('person').select('*');
  }

  selectPersonById(id) {
    return supabaseClient.from('person').select('*').match({ id: id });
  }

  deletePersonById(id) {
    return supabaseClient.from('person').delete().match({ id: id });
  }
}

module.exports = new DatabaseService();
