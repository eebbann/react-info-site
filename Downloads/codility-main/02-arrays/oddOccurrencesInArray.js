 //write a function that given a string S consisting of N characters, returns the number of occurrences of each character in string S.
 //For example, given string S = "abcbaba" the function should return [2, 1, 3, 1, 2] because there are 2 occurrences of 'a', 1 occurrence of 'b' and 3 occurrences of 'c'.
 //Write an efficient algorithm for the following assumptions:
 //N is an integer within the range [1..100,000];
 //string S consists only of lowercase English letters.
 //Input Format
 //The first line contains an integer N.
 //The second line contains string S.
 //Constraints
 //1 ≤ N ≤ 100,000
 //Each character in string S is an English lowercase letter.
 //Output Format
 //Print N integers. Each integer should be printed on a new line.
 //Sample Input
 //5

 function main() {
		const n = parseInt(readLine(), 10);

		const s = readLine();

		let result = [];
		for (let i = 0; i < n; i++) {
			const count = s.split('').filter(x => x === s[i]).length;
			result.push(count);
		}
		console.log(result.join('\n'));
	}
	main();
	