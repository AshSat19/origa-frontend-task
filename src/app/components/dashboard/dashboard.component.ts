import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isChartLoading: boolean;
  chartOptions: any;
  chartData: any;
  userDataSource: User[];
  userDataTableColumns: string[];

  constructor(private dataService: DataService) {
    this.isChartLoading = false;
    this.chartOptions = {
      height: '400',
      backgroundColor: 'transparent',
      chartArea: {
        width: '85%',
        height: '85%',
        backgroundColor: {
          fill: null,
          opacity: 0
        },
      },
      legend: {
        position: 'bottom',
        textStyle: { fontSize: 12 }
      },
      is3D: true
    };
    this.chartData = [
      ['Latitude > 0', 0],
      ['Latitude < 0', 0],
      ['Longitude > 0', 0],
      ['Longitude < 0', 0]
    ];
    this.userDataSource = [];
    this.userDataTableColumns = [
      'id', 'name', 'username', 'city', 'pincode', 'companyName'
    ];
  }

  ngOnInit(): void {
    this.isChartLoading = true;
    this.populateData();
  }

  populateData() {
    const userDistibution = [0, 0, 0, 0];
    this.dataService.fetchUsersData()
    .subscribe((userData: any) => {
      userData.forEach(user => {
        // Populate Chart Data
        if (user.address.geo.lat > 0) {
          userDistibution[0] += 1;
        } else {
          userDistibution[1] += 1;
        }
        if (user.address.geo.lng > 0) {
          userDistibution[2] += 1;
        } else {
          userDistibution[3] += 1;
        }

        // Populate Table Data
        const oneUser: User = {
          id: user.id,
          name: user.name,
          username: user.username,
          city: user.address.city,
          pincode: user.address.zipcode,
          companyName: user.company.name
        };
        this.userDataSource.push(oneUser);
      });

      this.chartData = [
        ['Latitude > 0', userDistibution[0]],
        ['Latitude < 0', userDistibution[1]],
        ['Longitude > 0', userDistibution[2]],
        ['Longitude < 0', userDistibution[3]]
      ];
    });
  }
}
