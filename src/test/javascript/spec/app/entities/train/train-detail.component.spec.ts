/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TrainDetailComponent } from 'app/entities/train/train-detail.component';
import { Train } from 'app/shared/model/train.model';

describe('Component Tests', () => {
    describe('Train Management Detail Component', () => {
        let comp: TrainDetailComponent;
        let fixture: ComponentFixture<TrainDetailComponent>;
        const route = ({ data: of({ train: new Train(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TrainDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.train).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
