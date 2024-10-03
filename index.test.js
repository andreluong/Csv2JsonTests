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


describe('1: Empty File', () => {
    test('A: dynamic_typing = true; separator = abs', async () => {
        const inputFile = 'input/1a.csv'
        const outputFile = 'output/1a.json'
        const expectedOutputFile = 'expected_output/1a.json'

        await convert(inputFile, outputFile, true, '.');

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));

    });
    test('B: dynamic_typing = false; separator = comma; tab_separators = true',async  () => {
        const inputFile = 'input/1b.csv'
        const outputFile = 'output/1b.json'
        const expectedOutputFile = 'expected_output/1b.json'

        await convert(inputFile, outputFile, false, ',');

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
});

describe('2: Empty header and one record and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma; tab_separators = false', async () => {
        const inputFile = 'input/2a.csv';
        const outputFile = 'output/2a.json';
        const expectedOutputFile = 'expected_output/2a.json';

        await convert(inputFile, outputFile);

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
    test('B: dynamic_typing = false; separator = abs; tab_separators = true', () => {
        
    });
});

describe('3: Empty header and many records and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma; tab_separators = false', () => {
        const inputFile = 'input/3a.csv';
        const outputFile = 'output/3a.json';
        const expectedOutputFile = 'expected_output/3.json';

        convert(inputFile, outputFile, true);

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
    test('B: dynamic_typing = false; separator = abs; tab_separators = true', () => {
        
    });
});

describe('10 fields with newlines (not newline characters) that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma;', async () => {
        const inputFile = 'input/10A.csv';
        const outputFile = 'output/10A.json';
        const expectedOutputFile = 'expected_output/10.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = comma', async () => {
        const inputFile = 'input/1b.csv'
        const outputFile = 'output/1b.json'
        const expectedOutputFile = 'expected_output/1a.json'

        await convert(inputFile, outputFile, false, ',');

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
});

describe('2: Empty header and one record and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/2a.csv';
        const outputFile = 'output/2a.json';
        const expectedOutputFile = 'expected_output/2a.json';

        await convert(inputFile, outputFile);

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
    test('B: dynamic_typing = false; separator = abs;', async () => {
        const inputFile = 'input/2b.csv';
        const outputFile = 'output/2b.json';
        const expectedOutputFile = 'expected_output/2b.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

describe('3: Empty header and many records and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/3a.csv';
        const outputFile = 'output/3a.json';
        const expectedOutputFile = 'expected_output/3a.json';

        await convert(inputFile, outputFile, true);

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/3b.csv';
        const outputFile = 'output/3b.json';
        const expectedOutputFile = 'expected_output/3b.json';

        await convert(inputFile, outputFile, false, ';');

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
});


describe('3: Empty header and many records and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma', async () => {
        const inputFile = 'input/3a.csv';
        const outputFile = 'output/3a.json';
        const expectedOutputFile = 'expected_output/3a.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs', async () => {
        const inputFile = 'input/3b.csv';
        const outputFile = 'output/3b.json';
        const expectedOutputFile = 'expected_output/3b.json';

        await convert(inputFile, outputFile, false, ';');

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
});