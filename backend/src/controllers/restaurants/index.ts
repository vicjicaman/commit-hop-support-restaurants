class RestaurantController {
  restaurantService: any;
  // We are using constructor injection.
  constructor(opts: any) {
    // Save a reference to our dependency.
    this.restaurantService = opts.restaurantService;
  }

  // imagine ctx is our HTTP request context...
  list(cxt: any) {
    return this.restaurantService.list(cxt);
  }
}

export default RestaurantController;
