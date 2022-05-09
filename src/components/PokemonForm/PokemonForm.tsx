import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,
    chooseDex,
    chooseGen,
    chooseType,
    chooseAbility} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface PokemonFormProps{
    id?:string;
    data?:{};
}

interface PokemonState{
    name:string,
    national_dex_number:string;
    generation:string;
    types:string;
    abilities:string;
}

export const PokemonForm = (props:PokemonFormProps) => {
    const dispatch = useDispatch();
    let {pokemonData, getData } = useGetData();
    const store = useStore();

    const name = useSelector<PokemonState>(state => state.name)
    const national_dex_number = useSelector<PokemonState>(state => state.national_dex_number)
    const generation = useSelector<PokemonState>(state => state.generation)
    const types = useSelector<PokemonState>(state => state.types)
    const abilities = useSelector<PokemonState>(state => state.abilities)
    

    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.data)
        if( props.id!){
            serverCalls.update(props.id!, data)
            console.log(`Updated: ${data.name} \nID: ${props.id}`)
            window.location.reload();
            event.target.reset()
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDex(data.national_dex_number))
            dispatch(chooseGen(data.generation))
            dispatch(chooseType(data.types))
            dispatch(chooseAbility(data.abilities))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload();
            event.target.rest();
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Pokemon Name</label>
                    <Input {...register('name')} name='name' placeholder = 'Pikachu'/>
                </div>
                <div>
                    <label htmlFor="national_dex_number">National Dex Number</label>
                    <Input {...register('national_dex_number')} name="national_dex_number" placeholder="25"/>
                </div>
                <div>
                    <label htmlFor="generation">Generation</label>
                    <Input {...register('generation')} name="generation" placeholder="I"/>
                </div>
                <div>
                    <label htmlFor="types">Type(s)</label>
                    <Input {...register('types')} name="types" placeholder="Electric"/>
                </div>
                <div>
                    <label htmlFor="abilities">Abilities</label>
                    <Input {...register('abilities')} name="abilities" placeholder="Lightning Rod"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}