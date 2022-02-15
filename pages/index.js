import React from 'react';
import {
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  AppBar,
} from '@mui/material';
import { useRouter } from 'next/router';
import DatabaseService from '../service/databaseService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const [personData, setPersonData] = React.useState({
    name: '',
    address: '',
    profession: '',
  });

  function handleSubmit(event) {
    handleOpen();
    setPersonData({
      name: '',
      address: '',
      profession: '',
    });
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPerson = {
      name: formData.get('name'),
      address: formData.get('address'),
      profession: formData.get('profession'),
    };

    DatabaseService.insertNewPerson(newPerson);
  }

  return (
    <div
      style={{
        id: '__next',
        display: `block`,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '300px',
      }}
    >
      <h1>Form</h1>
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
          value={personData.address}
          required
          InputLabelProps={{ shrink: true }}
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
          style={{ marginTop: '10px' }}
          value={personData.profession}
          required
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            setPersonData({ profession: e.target.value });
          }}
        />
        <br />
        <Button type="submit">Enviar</Button>
        <Button
          onClick={(e) => {
            router.push({
              pathname: '/list',
            });
          }}
        >
          Ver lista
        </Button>
      </form>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registro inserido
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Dados inseridos com sucesso!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
