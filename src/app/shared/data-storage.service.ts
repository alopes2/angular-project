import { RecipeService } from '../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor( private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http
            .put('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json',
                  this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http
            .get('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json')
            .map(
              (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                  if (!recipe['ingredients']) {
                    console.log(recipe);
                    recipe['ingredients'] = [];
                  }
                }
                return recipes;
              }
            )
            .subscribe(
              (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
              }
            );
  }
}
