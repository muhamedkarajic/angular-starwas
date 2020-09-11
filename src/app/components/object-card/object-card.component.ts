import { ObjectService } from 'src/app/services/object.service';
import { Component, Input } from "@angular/core";
@Component({
  selector: "object-card",
  templateUrl: "./object-card.component.html",
  styleUrls: ["./object-card.component.scss"],
})
export class ObjectCardComponent {
  constructor(public objectService: ObjectService) { }
  @Input() object: any;
}
