import OrbitingSkills from './OrbitingSkills';

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Tech Stack</h2>
        <OrbitingSkills />
        <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
          Proficient in modern frontend tools, IoT integrations, and creative animations.
        </p>
      </div>
    </section>
  );
}