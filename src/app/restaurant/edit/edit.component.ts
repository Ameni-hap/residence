import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  restaurantForm: Restaurant = {
    id: 0,
    name: '',
    adresse: '',
    phone: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private restaurantervice: RestaurantService
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
  }
 
  getById(id: number) {
    this.restaurantervice.getById(id).subscribe((data) => {
      this.restaurantForm = data;
    });
  }
 
  update() {
    this.restaurantervice.update(this.restaurantForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/restaurant/home"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}