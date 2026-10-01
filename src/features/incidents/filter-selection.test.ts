import { describe, expect, it } from 'vitest';
import {
  readFilterSelection,
  toIncidentFilters,
  writeFilterSelection,
} from './filter-selection';
describe('화면 간 공유 필터 계약', () => {
  it('허용되지 않은 필터는 무시하고 검색어 공백은 정리한다', () => {
    expect(
      readFilterSelection(
        new URLSearchParams(
          'q=+강남+&category=invalid&status=invalid&period=invalid',
        ),
      ),
    ).toEqual({
      query: '강남',
      category: undefined,
      status: undefined,
      period: undefined,
    });
  });
  it('필터 변경과 초기화에서 다른 화면의 파라미터는 보존한다', () => {
    const params = writeFilterSelection(
      { status: 'closed' },
      new URLSearchParams('page=2&q=old&category=society&period=1w'),
    );
    expect(params.toString()).toBe('page=2&status=closed');
  });
  it('검색어의 특수문자를 안전하게 왕복하고 입력 파라미터를 변경하지 않는다', () => {
    const existing = new URLSearchParams('view=map');
    const selection = {
      query: '서울 & 화재',
      category: 'society' as const,
      status: 'ongoing' as const,
      period: '1w' as const,
    };
    expect(
      readFilterSelection(writeFilterSelection(selection, existing)),
    ).toEqual(selection);
    expect(existing.toString()).toBe('view=map');
  });
  it('기간을 시간대가 명확한 사건 필터로 변환한다', () => {
    expect(
      toIncidentFilters({ period: '1w' }, new Date('2026-10-01T09:00:00+09:00'))
        .since,
    ).toBe('2026-09-24T00:00:00.000Z');
    expect(toIncidentFilters({})).not.toHaveProperty('period');
  });
});
