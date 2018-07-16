/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TestPaperUserDetailComponent } from 'app/entities/test-paper-user/test-paper-user-detail.component';
import { TestPaperUser } from 'app/shared/model/test-paper-user.model';

describe('Component Tests', () => {
    describe('TestPaperUser Management Detail Component', () => {
        let comp: TestPaperUserDetailComponent;
        let fixture: ComponentFixture<TestPaperUserDetailComponent>;
        const route = ({ data: of({ testPaperUser: new TestPaperUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TestPaperUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TestPaperUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TestPaperUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.testPaperUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
