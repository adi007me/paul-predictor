import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { Team } from '../services/teams/team';
import { TeamsService } from '../services/teams/teams.service';
import { UserStat } from '../services/user-stats/user-stats';
import { UserStatsService } from '../services/user-stats/user-stats.service';

@Component({
  selector: 'paul-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.less']
})
export class UserStatsComponent implements OnInit {
  loading: Boolean;
  isExpanded: Boolean;
  userStats: UserStat[];
  error: Boolean = false;
  data: any;

  @Input() userId: String;

  constructor(private userStatService: UserStatsService, private teamsService: TeamsService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.loading = true;
    this.error = false;
    this.userStatService.getUserStats(this.userId).subscribe(userStats => {
      this.userStats = userStats;
      this.calculateStats()
    }, error => {
      console.log(error);
      this.loading = false;
      this.error = true;
    })
  }

  calculateStats(): void {
    this.teamsService.getTeams().subscribe({
      next: teamsList => {
        const teams = [...teamsList]
        if (this.userStats.some(st => (st.choice.toLocaleLowerCase() === 'draw' && st.points !== 0))) {
          teams.push({ shortName: 'Draw', iconPath:'', name: 'Draw' } as Team)
        }

        const teamShortNames = teams.map(t => {
          const filteredByTeam = this.userStats.filter(st => st.choice.toUpperCase() === t.shortName.toUpperCase())

          const result = {
            shortName: t.shortName,
            timesSelected: filteredByTeam.length,
            points: filteredByTeam.reduce((a, b) => (a + b.points.valueOf()), 0)
          }

          return result;
        });

        this.data = teamShortNames.sort((a, b) => (b.timesSelected >= a.timesSelected ? 1 : -1));
        
        this.pieChartLabels = this.data.map(d => d.shortName) as Label[];
        this.pieChartData = this.data.map(d => d.timesSelected);

        const barChartData = this.data.sort((a, b) => (b.points > a.points) ? 1 : -1)
        this.barChartLabels = barChartData.map(d => d.shortName)

        const safeRound = d => Math.round((d.points + Number.EPSILON) * 100)/100

        this.barChartData = [
          { data: barChartData.map(safeRound), label: 'Points won' }
        ]


        const cumulativeSum = (sum => value => sum += value)(0);

        const lineChartData = this.userStats.map(safeRound).map(cumulativeSum);
        this.lineChartData = [
          { data: lineChartData, label: 'Points' }
        ]
        this.lineChartLabels = this.userStats.map(s => s.match_id) as Label[]
        
        this.loading = false;
      }, error: err => {
        console.log(err);
        this.loading = false;
        this.error = true;
      }
    })
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      intersect: false
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    
  };
  public barChartLabels: Label[] = [  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions:any = {
    responsive: true,
    elements: {
      line: {
        tension: 0,
      }
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

}
