var csv2json = require('csv2json');
var fs = require('fs');

function convert(inputFile, outputFile) {
    fs.createReadStream(inputFile)
        .pipe(csv2json())
        .pipe(fs.createWriteStream(outputFile));
}

test('convert', async () => {
    var inputFile = 'input/data.csv';
    var outputFile = 'output/data.json';
    var expectedOutputFile = 'expected_output/data.json';

    convert(inputFile, outputFile);
    
    expect(fs.readFileSync(expectedOutputFile))
        .toEqual(fs.readFileSync(outputFile));
});
