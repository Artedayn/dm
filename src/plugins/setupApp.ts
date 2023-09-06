import { Context } from '@nuxt/types';
import { ApiClass } from '@/api/ApiClass';
import { ApiServicesConfig } from '@/configs/ApiServicesConfig';

export default function (context: Context) {
  /******************************************************
   * Настройки, инициализации
   ******************************************************/

  /**
   * Инициализация конфига
   */
  ApiServicesConfig.setEnv(context.$config.envName);
  ApiServicesConfig.setHosts(context.$config.hostsConfig);

  /**
   * Инициализация ApiClass
   */
  ApiClass.init(context.$axios);

  /**
   * Проставление глобальных заголовков для запросов.
   */
  // ApiClass.setHeaders({
  //   "X-Example": "value",
  // });

  /**
   * Глобальный обработчик ошибок запросов.
   * Примечание: он никак не влияет дальнейшую цепочку вызова.
   */
  ApiClass.setGlobalRequestErrorHandler(requestError => {
    // Регистрируем обработку потери авторизации
    if (requestError.source === 'auth') {
      console.log(requestError);
      if (process.client) {
        window.alert(
          'Срок действия Вашей авторизации истек. Необходимо повторно осуществить вход.',
        );
        window.location.reload();
      } else {
        context.redirect('/');
      }
    }
  });
}
