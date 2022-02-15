import React from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import DatabaseService from '../service/databaseService';

export default function Edit() {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(true);
  const [personData, setPersonData] = React.useState({
    name: '',
    address: '',
    profession: '',
  });

  const userId = router.query.userId;
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedPerson = {
      name: formData.get('name'),
      address: formData.get('address'),
      profession: formData.get('profession'),
    };

    console.log(updatedPerson);

    DatabaseService.updatePerson(userId, updatedPerson).then(({ data }) => {
      router.push('/list');
    });
  }

  console.log('userId', userId);

  React.useEffect(() => {
    DatabaseService.selectPersonById(userId).then(({ data }) => {
      console.log(data[0]);
      setPersonData(data[0]);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <div
          style={{
            id: '__next',
            display: `block`,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '300px',
          }}
        >
          <h1>Editar cadastro</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Nome"
              variant="outlined"
              value={personData.name}
              required
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                setPersonData({ name: e.target.value });
              }}
            />
            <br />
            <TextField
              id="address"
              name="address"
              label="Endereço"
              variant="outlined"
              style={{ marginTop: '10px' }}
              required
              InputLabelProps={{ shrink: true }}
              value={personData.address}
              onChange={(e) => {
                setPersonData({ address: e.target.value });
              }}
            />
            <br />
            <TextField
              id="profession"
              name="profession"
              label="Profissão"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
              style={{ marginTop: '10px' }}
              value={personData.profession}
              onChange={(e) => {
                setPersonData({ profession: e.target.value });
              }}
            />
            <br />
            <Button type="submit">Salvar</Button>
            <Button
              onClick={(e) => {
                router.push('/list');
              }}
            >
              Voltar
            </Button>
          </form>
        </div>
      </>
    );
  }
}
