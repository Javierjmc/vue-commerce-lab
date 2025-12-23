import LocationMap from "../LocationMap";

export default function GoogleMapsSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      {" "}
      {/* Ajustar padding */}
      <div className="container mx-auto px-4 max-w-4xl">
        <LocationMap />
      </div>
    </section>
  );
}
