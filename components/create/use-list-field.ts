// Add/remove/update for one repeatable form field, e.g. profile.instruments.
export function useListField<T>(items: T[], onChange: (items: T[]) => void) {
  function add(item: T) {
    onChange([...items, item]);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function update(index: number, updater: (item: T) => T) {
    onChange(items.map((item, i) => (i === index ? updater(item) : item)));
  }

  return { add, remove, update };
}
