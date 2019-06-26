import React, {Component} from 'react';
import RecipeList from '../components/RecipeList';
import Search from '../components/Search';
import {recipeData} from '../data/tempList';

export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.getRecipes = this.getRecipes.bind(this);
        console.log(props)
    }
    state={
        recipes:recipeData,
        search:"",
        url: `https://www.food2fork.com/api/search?key=dc882939d7612dddd130586884a7fdfe&q=chicken%20breast&page=2`
    };

    async getRecipes() {
       try{
         const data = await fetch(this.state.url);
         const jsonData = await data.json();
         this.setState({
             recipes:jsonData.recipes
         })
         console.log(jsonData);
       }
       catch(error) {
           console.log(error);
       };
       
    }

    componentDidMount() {

        this.getRecipes();
    }

    handleChange = (e) => {
        this.setState({
            search:e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        return(
            <>
            <Search search={this.state.search} handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
            <RecipeList recipes={this.state.recipes}/>
            </>
        )
    }
}