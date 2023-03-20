import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LocationDTO, StandardResponse, StandardResponseObj } from '../Models/Models';
import { LocationService } from '../service/location.service';


@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss']
})
export class SearchAddressComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  @ViewChild("searchText",{ read: ElementRef }) searchText : ElementRef;
  mapShape=[
    {
      id:1,
      shape:"Ractangle"
    },
    {
      id:2,
      shape:"Circle"
    }
  ];
  markerShape:number=1;
  radius:number=3;
  searchString : string =  "";
  locationDTO : LocationDTO;
  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    this.locationDTO={
      addressLine1:"",
      addressLine2:"",
      city:"",
      state:"",
      zipCode:"",
      country:"",
      lat:0,
      lng: 0,
      searchString:""
    }
    this.GetSavedLocation();
  }
  public handleAddressChange(address: any) {
    // Populate address fields from above response
    if(address != null && address?.address_components != null){
      if(address?.address_components?.length > 0){
        this.locationDTO.searchString = this.searchText?.nativeElement?.value;
        console.log(this.locationDTO.searchString)
        let street = address?.address_components?.filter(
          function(item){
            if(item?.types?.includes('street_number')
            ){
              return item;
            }
          }
        );
          let addressLine1 = address?.address_components?.filter(
            function(item){
              if(item?.types?.includes('sublocality_level_2') ||
              item?.types?.includes('sublocality') ||
              item?.types?.includes('route')
              ){
                return item;
              }
            }
          );
          let addressLine2 = address?.address_components?.filter(
            function(item){
              if(item?.types?.includes('sublocality_level_1')
              ){
                return item;
              }
            }
          );
          let city = address?.address_components?.filter(
            function(item){
              if(item?.types?.includes('locality') ||
              item?.types?.includes('administrative_area_level_2')
              ){
                return item;
              }
            }
          );

          let state = address?.address_components?.filter(
            function(item){
              if(item?.types?.includes('administrative_area_level_1')
              ){
                return item;
              }
            }
          );

          let country = address?.address_components?.filter(
            function(item){
              if(item?.types?.includes('country')
              ){
                return item;
              }
            }
          );

          let zipCode = address?.address_components?.filter(
            function(item){
              if(item?.types?.includes('postal_code')
              ){
                return item;
              }
            }
          );

          if(street != null && street?.length != null && street?.length > 0){
            this.locationDTO.addressLine1 = addressLine1?.length > 0 ? street[0]?.long_name+' ' +addressLine1[0]?.long_name  : 'Not available';
          }
          else{
            this.locationDTO.addressLine1 = addressLine1?.length > 0 ? addressLine1[0]?.long_name : 'Not available';
          }
          this.locationDTO.addressLine2 = addressLine2?.length > 0 ? addressLine2[0]?.long_name : 'Not available';
          this.locationDTO.city = city?.length > 0 ? city[0]?.long_name : 'Not available';
          this.locationDTO.state = state?.length > 0 ? state[0]?.long_name : 'Not available';
          this.locationDTO.country = country?.length > 0 ? country[0]?.long_name : 'Not available';
          this.locationDTO.zipCode = zipCode?.length > 0 ? zipCode[0]?.long_name : 'Not available';
          this.locationDTO.lat = Number(parseFloat(address?.geometry?.location?.lat()).toFixed(4));
          this.locationDTO.lng = Number(parseFloat(address?.geometry?.location?.lng()).toFixed(4));
      }
    }

  }

  public shapesSVGPaths: any = {
    rectangle: 'M0,0 50,0 50,50 0,50'
  };

  saveLocation(){
    this.locationService.AddUpdateLocation(this.locationDTO).subscribe((res:StandardResponse<any>)=>{
      if(res != null && res?.isSuccess && res?.payload != null){
         alert('Location Has Been Saved');
      }
  },err =>{
    alert('Oops some error occured');
  });
  }

  GetSavedLocation(){
    this.locationService.GetSavedLocation().subscribe((res:StandardResponseObj<LocationDTO>)=>{
        if(res != null && res?.isSuccess && res?.payload != null){
           this.locationDTO = res?.payload;
        }
    });
  }
}
