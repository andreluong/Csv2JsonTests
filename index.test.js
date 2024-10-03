const csv2json = require('csv2json');
const fs = require('fs');

function convert(inputFile, outputFile, dynamicTyping=false, separator=',') {
    return new Promise((resolve, reject) => {
        fs.createReadStream(inputFile)
            .pipe(csv2json({ dynamicTyping, separator }))
            .pipe(fs.createWriteStream(outputFile))
            .on('finish', () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Delete all files in output folder before starting tests
beforeAll(() => {
    const outputDir = './output';
    fs.readdirSync(outputDir).forEach(f => fs.rmSync(`${outputDir}/${f}`));
})

// Test 1
describe('1: Empty File', () => {
    test('A: dynamic_typing = true; separator = abs', async () => {
        const inputFile = 'input/1a.csv'
        const outputFile = 'output/1a.json'
        const expectedOutputFile = 'expected_output/empty.json'

        await convert(inputFile, outputFile, true, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = comma',async  () => {
        const inputFile = 'input/1b.csv'
        const outputFile = 'output/1b.json'
        const expectedOutputFile = 'expected_output/empty.json'

        await convert(inputFile, outputFile);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 2
describe('2: Empty header and one record and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/2a.csv';
        const outputFile = 'output/2a.json';
        const expectedOutputFile = 'expected_output/empty.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/2b.csv';
        const outputFile = 'output/2b.json';
        const expectedOutputFile = 'expected_output/empty.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 3
describe('3: Empty header and many records and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/3a.csv';
        const outputFile = 'output/3a.json';
        const expectedOutputFile = 'expected_output/3.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/3b.csv';
        const outputFile = 'output/3b.json';
        const expectedOutputFile = 'expected_output/3.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 4
describe('4: Populated header and no records', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/4a.csv';
        const outputFile = 'output/4a.json';
        const expectedOutputFile = 'expected_output/empty.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/4b.csv';
        const outputFile = 'output/4b.json';
        const expectedOutputFile = 'expected_output/empty.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 5
describe('5: Populated header and one record and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/5a.csv';
        const outputFile = 'output/5a.json';
        const expectedOutputFile = 'expected_output/5.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/5b.csv';
        const outputFile = 'output/5b.json';
        const expectedOutputFile = 'expected_output/5.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 6
describe('6: Populated header and many records and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/6a.csv';
        const outputFile = 'output/6a.json';
        const expectedOutputFile = 'expected_output/6.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/6b.csv';
        const outputFile = 'output/6b.json';
        const expectedOutputFile = 'expected_output/6.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 7
describe('7: Fields with ints, floats, scientific notation that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/7a.csv';
        const outputFile = 'output/7a.json';
        const expectedOutputFile = 'expected_output/7a.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/7b.csv';
        const outputFile = 'output/7b.json';
        const expectedOutputFile = 'expected_output/7b.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 8
describe('8: Fields with true, false, null that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/8a.csv';
        const outputFile = 'output/8a.json';
        const expectedOutputFile = 'expected_output/8a.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/8b.csv';
        const outputFile = 'output/8b.json';
        const expectedOutputFile = 'expected_output/8b.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 9
describe('9: Fields containing escapes (e.g. \\n \\r \\uD834) that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/9a.csv';
        const outputFile = 'output/9a.json';
        const expectedOutputFile = 'expected_output/9.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/9b.csv';
        const outputFile = 'output/9b.json';
        const expectedOutputFile = 'expected_output/9.json';

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 10
describe('10 Fields with newlines (not newline character \\n) that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/10a.csv';
        const outputFile = 'output/10a.json';
        const expectedOutputFile = 'expected_output/10.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/10b.csv'
        const outputFile = 'output/10b.json'
        const expectedOutputFile = 'expected_output/10.json'

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 11
describe('11: Fields with text containing quotation marks (like in the text not incased) that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/11a.csv';
        const outputFile = 'output/11a.json';
        const expectedOutputFile = 'expected_output/11.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/11b.csv'
        const outputFile = 'output/11b.json'
        const expectedOutputFile = 'expected_output/11.json'

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 12
describe('12: Fields with text containing commas that’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/12a.csv';
        const outputFile = 'output/12a.json';
        const expectedOutputFile = 'expected_output/12.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/12b.csv'
        const outputFile = 'output/12b.json'
        const expectedOutputFile = 'expected_output/12.json'

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

// Test 13
describe('13: Fields with characters that can\’t normally be typed on a keyboard (e.g. control characters)', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/13a.csv';
        const outputFile = 'output/13a.json';
        const expectedOutputFile = 'expected_output/13.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/13b.csv'
        const outputFile = 'output/13b.json'
        const expectedOutputFile = 'expected_output/13.json'

        await convert(inputFile, outputFile, false, '|');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});
