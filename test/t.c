#include <stdio.h>  
#include <string.h>  
#include <sys/socket.h>  
#include <arpa/inet.h>  
#include <unistd.h>  
#include <netinet/in.h>  
#include <stdlib.h>  

#define MAXLINE 1024  

int main()
{
	int sockfd, n;
	char recvline[MAXLINE];
	struct sockaddr_in servaddr;
	char dns[32];
	char url[128];
	char *IP = "104.27.167.199";
	char *buf = "GET / HTTP/1.1\r\nHost:www.v4qd.com\r\nConnection: keep-alive\r\nCache-Control: max-age=0\r\n\
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n\
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36\r\n\r\n";

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0){
        //这是创建一个socket（套接字）AF_INT是说明用IPV4网络协议  SOKET—STREAM说明用tcp协议  0是让系统自己分配协议编号   如果不成功则sockfd等于0
        printf("socket error\n");
    }
    //AAyidong/index.html	
	printf("1\n");
	bzero(&servaddr, sizeof(servaddr));//把servaddr清零
	servaddr.sin_family = AF_INET;//这句以及后面两句是初始化结构体对象的（这句是说用IPV4网络协议）
    servaddr.sin_port = htons(443);//把主机地址顺序转换成网络地址顺序
    
	if (inet_pton(AF_INET, IP, &servaddr.sin_addr) <= 0){//检测ip地址合法性  并将ip赋值给  servaddr.sin_addr
        printf("inet_pton error\n");
    }
		
	if (connect(sockfd, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0){
        //去连接结构体对象servaddr里servaddr.sin_addr指定的主机
        printf("connect error\n");
    }
		
	write(sockfd, buf, strlen(buf));
	printf("%s\n\n", buf);
	while ((n = read(sockfd, recvline, MAXLINE)) > 0)
	{
        printf("%d",n);
		recvline[n] = 0;
		if (fputs(recvline, stdout) == EOF)
			printf("fputs error\n");
	}
	if (n < 0)
		printf("read error\n");
	printf("all ok now\n");
	exit(0);
}