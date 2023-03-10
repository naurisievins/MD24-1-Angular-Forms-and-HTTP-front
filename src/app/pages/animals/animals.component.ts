import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Animal } from './components/animal-list/animal-list.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
})
export class AnimalsComponent {
  animals: Animal[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getAnimalsData();
  }

  getAnimalsData() {
    this.httpService.getAnimals().subscribe(
      (response) => {
        this.animals = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCatsData(bool: boolean) {
    if (bool) {
      this.httpService.getCats().subscribe(
        (response) => {
          this.animals = response;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.getAnimalsData();
    }
  }

  onAddAnimal(animal: Omit<Animal, '_id'>) {
    this.httpService.postAnimal(animal).subscribe(
      (response) => {
        this.animals.push(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(id: string) {
    this.httpService.deleteAnimal(id).subscribe(
      () => {
        this.getAnimalsData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
