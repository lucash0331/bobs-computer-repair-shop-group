import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html'

})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    //Call to the purchases by service graph API
    this.invoiceService.findPurchasesByServiceGraph().subscribe((res) => {
      //map the response data to the purchases variable
      this.purchases = res['data'];
      console.log(this.purchases);

      // For loop over the purchases to split out the services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }
      // build's the object literal for primeNG bar graph
      this.data = {
        //Services label 
        labels: this.labels, 
        datasets: [
          //graph object
          {
            backgroundColor: [
              '#740001',
              '#AE0001',
              '#D3A625',
              '#EEBA30',
              '#000000',
              '#C0C0C0',
              'blue',
              'pink',
              'green',
              
            ],
            hoverBackgroundColor: [
              '#450101',
              '#7d0001',
              '#9c7b1c',
              '#a88322',
              '#403f3f',
              '#9c9a9a',
            ],
            data: this.itemCount,
          },
        ],
      };

      // verify the data objects structures matches primeNG expected format
      console.log('Data Object');
      console.log(this.data);
    });
  }

  ngOnInit(): void {}
}
