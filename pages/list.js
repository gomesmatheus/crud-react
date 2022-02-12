import React from 'react';
import {
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
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

const renderDeleteButton = () => {
  return (
    <IconButton color="primary" aria-label="delete button" component="span">
      <Delete></Delete>
    </IconButton>
  );
};

const renderEditButton = () => {
  return (
    <IconButton color="primary" aria-label="delete button" component="span">
      <Edit></Edit>
    </IconButton>
  );
};

export default function PersonList() {
  const [isLoading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const [personList, setPersonList] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState();

  React.useEffect(() => {
    DatabaseService.selectPersonList().then(({ data }) => {
      setPersonList(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  function handleCellClick(e) {
    if (e.field === 'edit') {
      router.push(`/edit?userId=${e.id}`);
    } else if (e.field === 'delete') {
      setSelectedId(e.id);
      handleOpen();
    }
    console.log(e);
  }

  const deletePerson = (e) => {
    console.log('Clicou deletar');
    console.log(selectedId);
    DatabaseService.deletePersonById(selectedId).then(({ data }) => {
      setPersonList(personList.filter((p) => p.id != data[0].id));
      setSelectedId(0);
      handleClose();
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <h1>Lista</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={personList}
            columns={[
              { field: 'id', headerName: 'ID', width: 70 },
              { field: 'name', headerName: 'Nome', width: 300 },
              { field: 'profession', headerName: 'Profissão', width: 300 },
              { field: 'address', headerName: 'Endereço', width: 350 },
              {
                field: 'edit',
                headerName: 'Editar',
                width: 80,
                renderCell: renderEditButton,
              },
              {
                field: 'delete',
                headerName: 'Excluir',
                width: 80,
                renderCell: renderDeleteButton,
                onClick: (data) => console.log(data),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
            disableSelectionOnClick
            onCellClick={(e) => handleCellClick(e)}
          />
        </div>

        <Button
          onClick={(e) => {
            router.push('/');
          }}
        >
          Voltar
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Tem certeza que dezeja excluir?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <br />
              <Button onClick={deletePerson}>Sim</Button>
              <Button onClick={handleClose}>Não</Button>
            </Typography>
          </Box>
        </Modal>
      </>
    );
  }
}
