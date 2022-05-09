import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { PokemonForm } from '../../components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Pokemon',
    width: 150,
    editable: true,
  },
  {
    field: 'national_dex_number',
    headerName: 'National Dex Number',
    width: 150,
    editable: true,
  },
  {
    field: 'generation',
    headerName: 'Generation',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'types',
    headerName: 'Type(s)',
    width: 160,
    editable: true,
  },
  {
    field: 'abilities',
    headerName: 'Abilities',
    width: 150,
    editable: true,
  }
];

interface gridData{
    data:{
        id?:string;
    }
}
export const DataTable = () => {
    let { pokemonData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true);
    }
    let handleClose = () => {
        setOpen(false);
    }

    let deleteData = async () => {
        await serverCalls.delete(`${gridData[0]}`)
        getData();
    }

    console.log(gridData) // a list of ID's from checked rows

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pokemonData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={newSelectionModel => setData(newSelectionModel)}
          {...pokemonData}
        />
        <Button onClick={handleOpen} color='primary'>Update</Button>
        <Button onClick={deleteData} color='warning'>Delete</Button>
        {/* Dialog Popup */}
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Update a Pokemon</DialogTitle>
            <DialogContent>
                <DialogContentText>Pokemon ID: {gridData[0]}</DialogContentText>
                <PokemonForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}
  