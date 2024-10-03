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


// describe('1: Empty File', () => {
//     test('A: dynamic_typing = true; separator = abs; tab_separators = false', () => {

//     });
//     test('B: dynamic_typing = false; separator = comma; tab_separators = true', () => {

//     });
// });

// describe('2: Empty header and one record and no characteristics listed in special character constraints', () => {
//     test('A: dynamic_typing = true; separator = comma; tab_separators = false', async () => {
//         const inputFile = 'input/2.csv';
//         const outputFile = 'output/2.json';
//         const expectedOutputFile = 'expected_output/2.json';

//         await convert(inputFile, outputFile);

//         expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
//     });
//     test('B: dynamic_typing = false; separator = abs; tab_separators = true', () => {
        
//     });
// });

// describe('3: Empty header and many records and no characteristics listed in special character constraints', () => {
//     test('A: dynamic_typing = true; separator = comma; tab_separators = false', () => {
//         const inputFile = 'input/3.csv';
//         const outputFile = 'output/3.json';
//         const expectedOutputFile = 'expected_output/3.json';

//         convert(inputFile, outputFile, true);

//         expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
//     });
//     test('B: dynamic_typing = false; separator = abs; tab_separators = true', () => {
        
//     });
// });

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
    test('B: dynamic_typing = false; separator = abs;', async () => {
        const inputFile = 'input/10B.csv';
        const outputFile = 'output/10B.json';
        const expectedOutputFile = 'expected_output/10.json';

        await convert(inputFile, outputFile, false, "*");

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

describe('11: fields with text containing quotation marks that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma;', async () => {
        const inputFile = 'input/11A.csv';
        const outputFile = 'output/11A.json';
        const expectedOutputFile = 'expected_output/11.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs;', async () => {
        const inputFile = 'input/11B.csv';
        const outputFile = 'output/11B.json';
        const expectedOutputFile = 'expected_output/11.json';

        await convert(inputFile, outputFile, false, "-");

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

describe('12: fields with text containing commas that\’s not valid json objects', () => {
    test('A: dynamic_typing = true; separator = comma;', async () => {
        const inputFile = 'input/12A.csv';
        const outputFile = 'output/12A.json';
        const expectedOutputFile = 'expected_output/12.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs;', async () => {
        const inputFile = 'input/12B.csv';
        const outputFile = 'output/12B.json';
        const expectedOutputFile = 'expected_output/12.json';

        await convert(inputFile, outputFile, false, ";");

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});

describe('13: fields with characters that can\’t normally be typed on a keyboard (e.g. control characters)', () => {
    test('A: dynamic_typing = true; separator = comma;', async () => {
        const inputFile = 'input/13A.csv';
        const outputFile = 'output/13A.json';
        const expectedOutputFile = 'expected_output/13.json';

        await convert(inputFile, outputFile, true);

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
    test('B: dynamic_typing = false; separator = abs;', async () => {
        const inputFile = 'input/13B.csv';
        const outputFile = 'output/13B.json';
        const expectedOutputFile = 'expected_output/13.json';

        await convert(inputFile, outputFile, false, ':');

        const input = JSON.parse(fs.readFileSync(expectedOutputFile));
        const output = JSON.parse(fs.readFileSync(outputFile));
        expect(input).toEqual(output);
    });
});