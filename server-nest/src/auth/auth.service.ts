import axios, { AxiosResponse } from 'axios'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common'

import { GithubUserDto } from './dto/github-user.dto'
import { GithubLoginOauthDto } from './dto/github-login-oauth.dto'
import { CreateGithubAccessTokenResponse } from './interface/create-github-access-token.interface'
import { GithubAccessTokenException } from './exceptions/github-access-token.exception'
import { GithubUserAccessTokenException } from './exceptions/github-user-access-token.exception'
import { validationConfig } from 'src/config/validation.config'

@Injectable()
export class AuthService {
  async createGithubAccessToken(code: string) {
    try {
      const accessTokenResponse = await axios.post<
        AxiosResponse,
        CreateGithubAccessTokenResponse
      >('https://github.com/login/oauth/access_token', null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      })

      if (
        accessTokenResponse.status >= HttpStatus.OK &&
        accessTokenResponse.status < HttpStatus.BAD_REQUEST
      ) {
        // Transforma os dados recebidos em uma instância da classe GithubUserDto
        const accessTokenResponseData = plainToClass(
          GithubLoginOauthDto,
          accessTokenResponse.data,
        )

        const validationErrors = await validate(
          accessTokenResponseData,
          validationConfig,
        )

        if (validationErrors.length > 0) {
          throw new GithubAccessTokenException(
            'The code passed is incorrect or expired.',
          )
        }

        // eslint-disable-next-line camelcase
        const { access_token } = accessTokenResponseData
        // eslint-disable-next-line camelcase
        return access_token
      } else {
        throw new GithubAccessTokenException(
          'Error retrieving access token from GitHub.',
        )
      }
    } catch (error) {
      throw new BadRequestException(
        'Error executing access token request: ' + error.message,
      )
    }
  }

  async getGithubUserWithAccessToken(accessToken: string) {
    try {
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      // Transforma os dados recebidos em uma instância da classe GithubUserDto
      const githubUserInfo = plainToClass(GithubUserDto, userResponse.data)

      return githubUserInfo
    } catch (error) {
      console.log(error)
      throw new GithubUserAccessTokenException(
        'O token de acesso é inválido ou expirou. Verifique suas credenciais.',
      )
    }
  }
}
