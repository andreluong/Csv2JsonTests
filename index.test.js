var csv2json = require('csv2json');
var fs = require('fs');
var diff = require('diff')

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


test('11: Fields containing quotation marks: dynamicTyped, separator=comma', async () => {
    var inputFile = './input/11.csv';
    var outputFile = './output/21.json';
    var expectedOutputFile = './expected_output/21.json';

    await convert(inputFile, outputFile, true, ',')
    expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)))
});

test('11: Fields containing quotation marks: dynamicTyp=false, separator=abs', async () => {
    var inputFile = './input/11.csv';
    var outputFile = './output/21.json';
    var expectedOutputFile = './expected_output/21.json';

    await convert(inputFile, outputFile, true, ',')
    expect(JSON.parse(fs.readFileSync(expectedOutputFile))).toEqual(JSON.parse(fs.readFileSync(outputFile)))
});