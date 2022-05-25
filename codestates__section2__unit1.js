// //일급 객체
// //함수 표현식은 할당 전에 사용할 수 없다.

// const square = function (num){
//     return num * num;
// };
// //   square 에 함수를 선언하고 return으로 num 과 num 을 곱해준다
// output = square(7);
// console.log(output);

// //고차함수, 함수를 리턴하는 함수 커링 함수
// function double(num) {
//     return num * 2;
//   }
  
//   function doubleNum(func, num) {
//     return func(num);
//   }
// let output = doubleNum(double, 4); 
// console.log(output); 
// //함수 doubleNum에서 num은 4, 위의 double함수를 거쳐서  8을 리턴
// //여기서 doubleNum의 리턴이 func(num)이고 === double(num)과 같다
// //따라서 런을 돌려보면 8이 나온다.

// // 함수를 리턴 like num + added
// function adder(added) {
//     return function (num) {
//       return num + added;
//     };
//   }
//   //added가 2라면 함수 adder는 함수(num)를 리턴하는데 이 함수(num)은
//   //num + added 따라서 num + 2 가 된다.
// let output = adder(5); 
// console.log(output);
// // 함수 adder(added) === 함수(num) , 따라서 adder(added) = (num)
// // adder(5) === (num) , (3) === added
// // (3) 없으면 [Function (anonymous)] 이렇게 나온다. 
// // 좀 더 이해가 필요

//함수를 인자로 받고 함수 리턴
// function double(num) {
//     return num * 2;
//   }
  
//   function doubleAdder(added, func) {
//     const doubled = func(added); //func(5) return function(num)
//     return function (num) {      //func(5) === double ===return 10
//       return num + doubled;      // 5가 10을 만들고 doubled 값에 들어가고 (3)을 더했다.
//     };
//   }

//   // doubleAdder(5, double)는 함수이므로 함수 호출 기호 '()'를 사용할 수 있습니다.
// console.log(doubleAdder(5, double)(3)); // -> 13
// // doubleAdder(5, double은 내부 고차함수로 놓고 (3)이 function(num)의 값인 같다.)
// // doubleAdder가 리턴하는 함수를 변수에 저장할 수 있습니다. (일급 객체)
// const addTwice3 = doubleAdder(3, double); //3*2 (2) 따라서 8
// console.log(addTwice3(2)); // addTwice3(2) == function (num)과 같다

// function makeAddressBook(addressBook, user) {
//     let firstLetter = user.name[0];
  
//     if(firstLetter in addressBook) {
//       addressBook[firstLetter].push(user);
//     } else {
//       addressBook[firstLetter] = [];
//       addressBook[firstLetter].push(user);
//     }
  
//     return addressBook;
//   }
  
//   let users = [
//     { name: 'Tim', age: 40 },
//     { name: 'Satya', age: 30 },
//     { name: 'Sundar', age: 50 }
//   ];
  
//   console.log(users.reduce(makeAddressBook, {}))

const data = [
    {
      gender: 'male',
      age: 24,
    },
    {
      gender: 'male',
      age: 25,
    },
    {
      gender: 'female',
      age: 27,
    },
    {
      gender: 'female',
      age: 22,
    },
    {
      gender: 'male',
      age: 29,
    },
  ];
function getOnlyMales(data) {
    return data.filter(function (d) {
      return d.gender === 'male';
    });
  }
  console.log(getOnlyMales(data))
  
  function getOnlyAges(data) {
    return data.map(function (d) {
      return d.age;
    });
  }
  console.log(getOnlyAges(data));
  
  function getAverage(data) {
    const sum = data.reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
    return sum / data.length;
  }
//   console.log(getAverage(data))
  
  function compose(...funcArgs) {
    // compose는 여러 개의 함수를 인자로 전달받아 함수를 리턴하는 고차 함수입니다.
    // compose가 리턴하는 함수(익명 함수)는 임의의 타입의 data를 입력받아,
    return function (data) {
      // funcArgs의 요소인 함수들을 차례대로 적용(apply)시킨 결과를 리턴합니다.
      let result = data;
      for (let i = 0; i < funcArgs.length; i++) {
        result = funcArgs[i](result);
      }
      return result;
    };
  }
  // compose를 통해 함수들이 순서대로 적용된다는 것이 직관적으로 드러납니다.
  // 각각의 함수는 다른 목적을 위해 재사용(reuse) 될 수 있습니다.
  const getAverageAgeOfMale = compose(
    getOnlyMales, // 배열을 입력받아 배열을 리턴하는 함수
    getOnlyAges, // 배열을 입력받아 배열을 리턴하는 함수
    getAverage // 배열을 입력받아 `number` 타입을 리턴하는 함수
  );
  
  const result = getAverageAgeOfMale(data);
  console.log(result); // --> 26

  