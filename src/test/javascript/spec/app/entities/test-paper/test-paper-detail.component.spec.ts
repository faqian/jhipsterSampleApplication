/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TestPaperDetailComponent } from 'app/entities/test-paper/test-paper-detail.component';
import { TestPaper } from 'app/shared/model/test-paper.model';

describe('Component Tests', () => {
    describe('TestPaper Management Detail Component', () => {
        let comp: TestPaperDetailComponent;
        let fixture: ComponentFixture<TestPaperDetailComponent>;
        const route = ({ data: of({ testPaper: new TestPaper(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TestPaperDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestPaperDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestPaperDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testPaper).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
