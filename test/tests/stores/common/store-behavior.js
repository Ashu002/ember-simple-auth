var storeBehavior = function() {
  describe('#persist', function() {
    it('persists an object', function() {
      this.store.persist({ key: 'value' });

      expect(this.store.restore()).to.eql({ key: 'value' });
    });

    it('does not override existing values', function() {
      this.store.persist({ key1: 'value1' });
      this.store.persist({ key2: 'value2' });

      expect(this.store.restore()).to.eql({ key1: 'value1', key2: 'value2' });
    });
  });

  describe('#restore', function() {
    describe('when the store is empty', function() {
      it('returns an empty object for an empty store', function() {
        expect(this.store.restore()).to.eql({});
      });
    });

    describe('when the store has elements', function() {
      beforeEach(function() {
        this.store.persist({ key1: 'value1', key2: 'value2' });
      });

      it('returns all properties in the store', function() {
        expect(this.store.restore()).to.eql({ key1: 'value1', key2: 'value2' });
      });

      it('returns a copy of the stored properties', function() {
        var properties = this.store.restore();
        properties.key1 = 'another value!';

        expect(this.store.restore()).to.eql({ key1: 'value1', key2: 'value2' });
      });
    });
  });

  describe('#clear', function() {
    it('empties the store', function() {
      this.store.persist({ key1: 'value1', key2: 'value2' });
      this.store.clear();

      expect(this.store.restore()).to.eql({});
    });
  });
};

export { storeBehavior };
