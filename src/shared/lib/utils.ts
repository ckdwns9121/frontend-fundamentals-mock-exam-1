/**
 * ID를 가진 엔티티 인터페이스
 */
export interface Identifiable {
  id: string;
}

/**
 * ID로 엔티티 찾기 (제네릭)
 * @param items 엔티티 목록
 * @param id 찾을 엔티티 ID
 * @returns 찾은 엔티티 또는 null
 * @example
 * ```ts
 * const product = findById(products, productId);
 * const user = findById(users, userId);
 * ```
 */
export function findById<T extends Identifiable>(items: T[], id: string | null): T | null {
  if (!id) {
    return null;
  }
  return items.find(item => item.id === id) || null;
}
