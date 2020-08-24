import React, { useState, useEffect } from 'react';
import {AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography, TextField} from '@material-ui/core';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search'
import {makeStyles, fade} from '@material-ui/core/styles'

const useStyles = makeStyles(theme =>({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },

    CardMedia: {
        height:0,
        paddingTop: '100%',
    },

    CardContent: {
        textAlign: "center",
    },

    searchContainer:{
        display:'flex',
        backgroundColor: fade(theme.palette.common.white,0.15),
        marginTop: "5px",
        marginBottom: "5px",
        paddingRight: "20px",
        paddingLeft: "20px",
    },

    SearchIcon: {
        alignSelf:"felx-end",
        marginBottom: "5px",
    },

    searchInput: {
        width: "200px",
        margin: "5px",
    }





}))

const toFirstCharUppercase = name =>
   name.charAt(0).toUpperCase() + name.slice(1);



const Pokedex = props => {
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    useEffect(()=>{
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(function(response){
            const {data} = response;
            const {results} = data;
            const newPokemonData ={};
            results.forEach((pokemon,index) => {
                newPokemonData[index+1] = {
                    id: index+1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                }
            })
            setPokemonData(newPokemonData);
        });


    },[]);

    const getPokemonCard = (pokemonId) => {
        const {id, name, sprite} = pokemonData[pokemonId];
        
    
        return (
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${id}`)}>
                    <CardMedia
                      className={classes.CardMedia}
                      image={sprite}
                      />
                    <CardContent className={classes.CardContent}>
                        <Typography>
                            {`${id}. ${toFirstCharUppercase(name)}`}
                        </Typography>
                    </CardContent>
                </Card>
    
            </Grid>
    
        )
    
    }

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className = {classes.searchContainer}>
                      <SearchIcon className = {classes.searchIcon}/>
                      <TextField 
                        className = {classes.searchInput}
                        label="Pokemon"
                        variant="standard"
                        onChange={handleSearchChange}/>
                        

                    </div>


                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId => 
                        pokemonData[pokemonId].name.includes(filter) &&
                        getPokemonCard(pokemonId))}
                </Grid>
            ) : (
                <CircularProgress/>
            )}

        </>
    )
}

export default withRouter(Pokedex);