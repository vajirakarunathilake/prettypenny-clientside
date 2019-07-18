import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Taxonomy } from '../taxonomy';
import { TaxonomyService } from 'src/app/services/taxonomy.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filterBy: string;
  filterToggle: boolean;
  filters: Taxonomy[];
  filterNames: string[];
  filterTypes: string[];
  filterSubTypes: string[];
  selectedPretty: boolean;
  selectedPenny: boolean;

  @ViewChild('searchInput', { static: false }) searchText: ElementRef;
  layoutMode: boolean; // true for grid, false for list

  constructor(
    private prodService: ProductService,
    private taxService: TaxonomyService
  ) { }

  ngOnInit() {
    this.setFilterToggle();
    const filterNames = [];
    const filterTypes = [];
    const filterSubTypes = [];
    this.taxService.findAll().subscribe(
      (taxonomies: Taxonomy[]) => {
        this.filters = taxonomies;
        this.filters.forEach(
          filter => {
            if (!filterNames.includes(filter.name)) {
              filterNames.push(filter.name);
            }
            if (!filterTypes.includes(filter.type)) {
              filterTypes.push(filter.type);
            }
            if (!filterSubTypes.includes(filter.subType)) {
              filterSubTypes.push(filter.subType);
            }
          }
        );
        this.filterNames = filterNames;
        this.filterTypes = filterTypes;
        this.filterSubTypes = filterSubTypes;
      }
    );
    this.filterBy = this.prodService.getFilter();
    this.prodService.filterTypeEmitter.subscribe(
      (filverValue: string) => {
        this.filterBy = filverValue;
      }
    );
    this.layoutMode = this.prodService.getLayout();
    this.prodService.layoutModeEmitter.subscribe(
      (layoutVal: boolean) => {
        this.layoutMode = layoutVal;
      }
    );
  }

  setLayout(layoutVal: boolean) {
    this.prodService.setLayout(layoutVal);
  }

  setFilterToggle() {
    this.filterToggle = window.outerWidth > 768 ? true : false;
  }

  searchFilter() {
    this.prodService.searchFilter(this.searchText.nativeElement.value);
  }

  switchProducts(selectedGroup: string) {
    if (selectedGroup === 'Pretty') {
      this.selectedPretty = true;
      this.selectedPenny = !this.selectedPretty;
    } else {
      this.selectedPenny = true;
      this.selectedPretty = !this.selectedPenny;
    }
    this.prodService.setFilter(selectedGroup);

  }

  setFilter(filterValue: string) {
    this.selectedPretty = false;
    this.selectedPenny = false;
    this.prodService.setFilter(filterValue);
  }

  resetFilters() {
    this.prodService.setFilter('all');
    this.searchText.nativeElement.value = '';
    this.selectedPretty = false;
    this.selectedPenny = false;
    this.prodService.searchFilter('');
  }

}
