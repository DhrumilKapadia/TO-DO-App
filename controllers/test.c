#include <stdio.h>

int main(){
	int num,A[num],i;
	scanf("%d", &num);             
	
	for(i=0;i<num;i++){
	    scanf("%d",A[i]);
	}
	int res=1;
	for(i=0;i<num;i++){
	    res = res*A[i]%(10^9 + 7);
	}
		    printf("%d", &res);

	}
