class DigitalSignature {
  constructor() {
    this.cryptoProvider = new CryptoService();
    this.validator = new SignatureValidator();
  }

  /**
   * Создание электронной подписи
   * @param {Document} document - Подписываемый документ
   * @param {User} user - Пользователь
   * @returns {Signature} - Объект подписи
   */
  async signDocument(document, user) {
    await this.authenticateUser(user); 
    
    const docHash = this.cryptoProvider.createHash(document);
    
    const signature = this.cryptoProvider.sign(
      docHash, 
      user.privateKey
    );
    
    return {
      documentId: document.id,
      userId: user.id,
      timestamp: new Date(),
      signature: signature,
      certificate: user.certificate
    };
  }

  async verifySignature(signedDocument) {
    return this.validator.validate(
      signedDocument.signature,
      signedDocument.certificate
    );
  }
}