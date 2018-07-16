/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TestPaperUserComponent } from 'app/entities/test-paper-user/test-paper-user.component';
import { TestPaperUserService } from 'app/entities/test-paper-user/test-paper-user.service';
import { TestPaperUser } from 'app/shared/model/test-paper-user.model';

describe('Component Tests', () => {
    describe('TestPaperUser Management Component', () => {
        let comp: TestPaperUserComponent;
        let fixture: ComponentFixture<TestPaperUserComponent>;
        let service: TestPaperUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TestPaperUserComponent],
                providers: []
            })
                .overrideTemplate(TestPaperUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestPaperUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPaperUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestPaperUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testPaperUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
