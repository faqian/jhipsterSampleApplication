/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TestPaperComponent } from 'app/entities/test-paper/test-paper.component';
import { TestPaperService } from 'app/entities/test-paper/test-paper.service';
import { TestPaper } from 'app/shared/model/test-paper.model';

describe('Component Tests', () => {
    describe('TestPaper Management Component', () => {
        let comp: TestPaperComponent;
        let fixture: ComponentFixture<TestPaperComponent>;
        let service: TestPaperService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TestPaperComponent],
                providers: []
            })
                .overrideTemplate(TestPaperComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestPaperComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPaperService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestPaper(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testPapers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
