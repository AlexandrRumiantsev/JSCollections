describe("pow", function() {

  function makeTest(x) {
    var expected = x * x * x;
    it("при возведении " + x + " в степень 3 результат: " + expected, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (var x = 1; x <= 5; x++) {
    makeTest(x);
  }

});

describe("pow2", function() {

  it("при возведении в отрицательную степень результат NaN", function() {
    assert(isNaN(pow(2, -1)));
  });

  it("при возведении в дробную степень результат NaN", function() {
    assert(isNaN(pow(2, 1.5)));
  });

});