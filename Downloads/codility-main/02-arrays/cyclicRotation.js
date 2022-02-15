//cyvlic rotation
function soln(A, K){
	const N = A.length;
	const result = new Array(N);

	for (let i = 0; i < N; i++) {
		result[(i + K) % N] = A[i]//(i + K) % N this
	}
  return result;
}
