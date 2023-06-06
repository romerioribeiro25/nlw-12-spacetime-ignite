import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { GithubUserDto } from 'src/auth/dto/github-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(githubUserDto: GithubUserDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        githubId: githubUserDto.id,
      },
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          githubId: githubUserDto.id,
          login: githubUserDto.login,
          name: githubUserDto.name,
          avatarUrl: githubUserDto.avatar_url,
        },
      })
    }

    return user
  }
}
