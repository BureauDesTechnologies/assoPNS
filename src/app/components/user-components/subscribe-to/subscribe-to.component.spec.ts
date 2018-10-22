import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SubscribeToComponent} from "./subscribe-to.component";

describe('SubscribeToComponent', () => {
    let component: SubscribeToComponent;
    let fixture: ComponentFixture<SubscribeToComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubscribeToComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscribeToComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
