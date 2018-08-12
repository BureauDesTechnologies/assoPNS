import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AssosOverviewComponent} from "./assos-overview.component";

describe('AssosOverviewComponent', () => {
    let component: AssosOverviewComponent;
    let fixture: ComponentFixture<AssosOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AssosOverviewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssosOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
