import {byLength} from "./filters";

test('byLength', async () => {
    expect(
        ['1', '22', '4444', '333'].sort(byLength)
    ).toEqual(['4444', '333', '22', '1']);
});
