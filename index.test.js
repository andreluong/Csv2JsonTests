const csv2json = require('csv2json');
const fs = require('fs');

function convert(inputFile, outputFile, dynamicTyping=false, separator=':') {
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
    test('A: dynamic_typing = true; separator = abs; tab_separators = false', () => {

    });
    test('B: dynamic_typing = false; separator = comma; tab_separators = true', () => {

    });
});

describe('2: Empty header and one record and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma; tab_separators = false', async () => {
        const inputFile = 'input/2.csv';
        const outputFile = 'output/2.json';
        const expectedOutputFile = 'expected_output/2.json';

        await convert(inputFile, outputFile);

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
    test('B: dynamic_typing = false; separator = abs; tab_separators = true', () => {
        
    });
});

describe('3: Empty header and many records and no characteristics listed in special character constraints', () => {
    test('A: dynamic_typing = true; separator = comma; tab_separators = false', () => {
        const inputFile = 'input/3.csv';
        const outputFile = 'output/3.json';
        const expectedOutputFile = 'expected_output/3.json';

        convert(inputFile, outputFile, true);

        expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)));
    });
    test('B: dynamic_typing = false; separator = abs; tab_separators = true', () => {
        
    });
});