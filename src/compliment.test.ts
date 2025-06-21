import {generateCompliment} from "./index";

test('Can we generate a compliment', async () => {
    const compliment = generateCompliment();
    expect(compliment).toBeTruthy();
});
